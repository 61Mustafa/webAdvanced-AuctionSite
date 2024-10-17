// MustafaDemir-auctionSite/client/src/commonComponents/auth.js

export async function checkAdminRole() {
    const token = localStorage.getItem('token');

    if (!token) {
        return Promise.reject('No access: You are not logged in');
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.role === 'admin') {
            return true;
        } else {
            throw new Error('No access: You are not an admin');
        }
    } catch (error) {
        console.error('Error checking admin rights:', error);
        throw error;
    }
}

