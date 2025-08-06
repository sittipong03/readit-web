import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUserStore from '../stores/userStore';

function FollowButton({ targetUserId }) {
    const { userId, token } = useUserStore();
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);

    const isLoggedIn = !!userId && !!token;
    const isSelf = userId === targetUserId;

    useEffect(() => {
        if (!isLoggedIn || !targetUserId || isSelf) return;

        const fetchFollowStatus = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:6500/api/${targetUserId}/is-following`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setIsFollowing(res.data.isFollowing);
                console.log("Follow status fetched:", res.data.isFollowing)
            } catch (err) {
                console.error('Failed to check follow status:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowStatus();
    }, [isLoggedIn, targetUserId, token, isSelf]);

    const handleToggleFollow = async () => {
        try {
            if (isFollowing) {
                await axios.delete(
                    `http://localhost:6500/api/${targetUserId}/unfollow`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setIsFollowing(false);
            } else {
                await axios.post(
                    `http://localhost:6500/api/${targetUserId}/follow`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setIsFollowing(true);
            }
        } catch (err) {
            console.error('Follow/unfollow failed:', err);
            alert('Failed to update follow status.');
        }
    };

    if (!isLoggedIn || isSelf || loading) return null;

    return (
        <button
            onClick={handleToggleFollow}
            className={`px-4 py-1 rounded-full text-sm transition ${isFollowing
                ? 'bg-[#82776b] text-white hover:bg-[#6f665c]'
                : 'bg-[#82776b] text-white hover:bg-[#6f665c]'
                }`}
        >
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
    );
}

export default FollowButton;