import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

export const EditUser = () => {
    const { id } = useParams(); // Get user ID from the URL
    const navigate = useNavigate();
    const { authorizationToken, API } = useAuth();

    const [user, setUser] = useState({
        username: '',
        email: '',
        phone: '',
    });

    const [loading, setLoading] = useState(true);

    // Fetch user details
    const fetchUser = async () => {
        try {
            const response = await fetch(`${API}/api/admin/users/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }

            const data = await response.json();
            setUser(data); // Set user data
        } catch (error) {
            console.error('Error fetching user details:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API}/api/admin/users/${id}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Failed to update user details');
            }

            const data = await response.json();
            console.log('User updated:', data);
            navigate('/admin/users'); // Redirect to user list
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Update form values
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) return <p>Loading user details...</p>;

    return (
        <section className="edit-user-section">
            <div className="container">
                <h1>Edit User</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Update User</button>
                </form>
            </div>
        </section>
    );
};
