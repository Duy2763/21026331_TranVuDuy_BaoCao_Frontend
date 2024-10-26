// const API_URL = 'http://localhost:3000';
const API_URL = 'http://192.168.1.35:3000';

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

// export const getProducts = async (categoryId, attribute) => {
//     try {
//         let url = `${API_URL}/products`;
        // if (categoryId) {
        //     url += `?categoryId=${categoryId}`;
            
        // }
//         if (attribute) {
//             url += `&attribute=${attribute}`;
//         }
        
//         const res = await fetch(url);
//         if (!res.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return res.json();
//     } catch (error) {
//         console.error('Error:', error);
//         throw error; // Hoặc xử lý lỗi theo cách bạn muốn
//     }
// }

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

// export const getAccounts = async () => {
//     try {
//         const res = await fetch(`${API_URL}/accounts`);
//         if (!res.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return res.json();
//     } catch (error) {
//         console.error('Error:', error);
//         throw error; // Hoặc xử lý lỗi theo cách bạn muốn
//     }
// }