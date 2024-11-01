import { API_URL } from '@env'

export const getAccounts = async () => {
    try {
        const res = await fetch(`${API_URL}/accounts`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    } catch (error) {
        console.error('Error:', error);
        throw error; // Hoặc xử lý lỗi theo cách bạn muốn
    }
}

export const patchPassword = async (id, newPassword) => {
    try {
        const url = `${API_URL}/accounts/${id}/password`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        const data = await response.json();
        console.log('Password updated successfully', data);
        return data;
    } catch (error) {
        console.error('Error updating password', error);
        throw error;
    }
};







export const getProducts = async (categoryId) => {
    try {
        let url = `${API_URL}/products`;  
        if (categoryId) {
            url += `?categoryId=${categoryId}`;
            
        }  
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
}


export const createAccount = async (name, password) => {
    try {
        const response = await fetch(`${API_URL}/accounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Account created successfully', data);
    } catch (error) {
        console.error('Error creating account', error);
    }
};

export const loginAccount = async (name, password) => {
    try {
        const url = `${API_URL}/accounts/login?name=${name}&password=${password}`;
        console.log(`Requesting URL: ${url}`); // Ghi nhật ký URL
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        const data = await response.json();
        console.log('Login successful', data);
        return data;
    } catch (error) {
        console.error('Error logging in', error);
        throw error;
    }
};


