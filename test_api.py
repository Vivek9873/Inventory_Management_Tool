"""
Inventory Management Tool - API Test Script
This script tests your Inventory Management Tool as part of the Fi Internship Assignment.
"""

import requests

BASE_URL = "http://localhost:8080"  # Change this if your backend runs on a different port


def print_result(test_name, passed, expected=None, got=None, request_data=None, response_body=None):
    if passed:
        print(f"{test_name}: PASSED")
    else:
        print(f"{test_name}: FAILED")
        if request_data:
            print(f"  Request: {request_data}")
        if expected is not None and got is not None:
            print(f"  Expected: {expected}, Got: {got}")
        if response_body:
            print(f"  Response Body: {response_body}")


def test_register_user():
    payload = {"username": "puja", "password": "mypassword", "email": "puja@example.com"}
    res = requests.post(f"{BASE_URL}/register", json=payload)
    passed = res.status_code in [200, 201, 400, 409]  # Depending on your code
    print_result("User Registration", passed, "200/201/400/409", res.status_code, payload, res.text)


def test_login():
    payload = {"username": "puja", "password": "mypassword"}
    res = requests.post(f"{BASE_URL}/login", json=payload)
    token = None
    passed = False
    if res.status_code == 200:
        try:
            token = res.json().get("accessToken")
            passed = token is not None
        except Exception:
            passed = False
    print_result("Login Test", passed, "200 with accessToken", res.status_code, payload, res.text)
    return token


def test_add_product(token):
    payload = {
        "name": "Phone",
        "type": "Electronics",
        "sku": "PHN-001",
        "image_url": "https://example.com/phone.jpg",
        "description": "Latest Phone",
        "quantity": 5,
        "price": 999.99
    }
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.post(f"{BASE_URL}/products", json=payload, headers=headers)
    passed = res.status_code in [200, 201]
    product_id = None
    if passed:
        try:
            product_id = res.json().get("product_id") or res.json().get("data", {}).get("_id")
        except Exception:
            pass
    print_result("Add Product", passed, "201", res.status_code, payload, res.text)
    return product_id


def test_update_quantity(token, product_id, new_quantity):
    payload = {"quantity": new_quantity}
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.put(f"{BASE_URL}/products/{product_id}/quantity", json=payload, headers=headers)
    passed = res.status_code == 200
    print_result("Update Quantity", passed, "200", res.status_code, payload, res.text)


def test_get_products(token, expected_quantity):
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.get(f"{BASE_URL}/products", headers=headers)
    passed = res.status_code == 200
    if not passed:
        print_result("Get Products", passed, "200", res.status_code, None, res.text)
        return
    try:
        data = res.json()
        products = data if isinstance(data, list) else data.get("data", [])
        phone_product = next((p for p in products if p.get("name") == "Phone"), None)
        if phone_product and phone_product.get("quantity") == expected_quantity:
            print(f"Get Products: PASSED (Quantity = {expected_quantity})")
        else:
            print("Get Products: FAILED")
            print(f"  Expected Quantity: {expected_quantity}, Got: {phone_product.get('quantity') if phone_product else 'N/A'}")
            print(f"  Product Data: {phone_product}")
    except Exception as e:
        print("Get Products: FAILED - Invalid JSON response")
        print(e)
        print(res.text)


def run_all_tests():
    test_register_user()
    token = test_login()
    if not token:
        print("Login failed. Skipping further tests.")
        return
    product_id = test_add_product(token)
    if not product_id:
        print("Product creation failed. Skipping further tests.")
        return
    test_update_quantity(token, product_id, new_quantity=15)
    test_get_products(token, expected_quantity=15)


if __name__ == "__main__":
    run_all_tests()
