import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000/api';

console.log('🧪 Testing Backend API...\n');

// Test 1: Health Check
async function testHealthCheck() {
  try {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    console.log('✅ Health Check:', data.message);
    return true;
  } catch (error) {
    console.error('❌ Health Check Failed:', error.message);
    return false;
  }
}

// Test 2: Get All Books
async function testGetBooks() {
  try {
    const response = await fetch(`${API_URL}/books`);
    const data = await response.json();
    console.log(`✅ Get Books: Found ${data.count} books`);
    return true;
  } catch (error) {
    console.error('❌ Get Books Failed:', error.message);
    return false;
  }
}

// Test 3: Search Books
async function testSearchBooks() {
  try {
    const response = await fetch(`${API_URL}/books/search?q=React`);
    const data = await response.json();
    console.log(`✅ Search Books: Found ${data.count} books matching "React"`);
    return true;
  } catch (error) {
    console.error('❌ Search Books Failed:', error.message);
    return false;
  }
}

// Test 4: Login
async function testLogin() {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@bookstore.com',
        password: 'test123'
      })
    });
    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ Login: ${data.message}`);
      return data.data.token;
    } else {
      console.error('❌ Login Failed:', data.message);
      return null;
    }
  } catch (error) {
    console.error('❌ Login Failed:', error.message);
    return null;
  }
}

// Test 5: Get Profile (Protected Route)
async function testGetProfile(token) {
  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ Get Profile: ${data.data.fullName} (${data.data.email})`);
      return true;
    } else {
      console.error('❌ Get Profile Failed:', data.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Get Profile Failed:', error.message);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('Starting API Tests...\n');
  
  await testHealthCheck();
  await testGetBooks();
  await testSearchBooks();
  
  const token = await testLogin();
  if (token) {
    await testGetProfile(token);
  }
  
  console.log('\n✨ All tests completed!');
}

runTests();
