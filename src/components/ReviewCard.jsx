import React, { useState } from 'react';
import axios from 'axios';
import VoteButton from './VoteButton';
import FollowButton from './FollowButton';
import MoreMenu from './MoreMenu';
import useUserStore from '../stores/userStore';

function ReviewCard({ review, onRefresh }) {
    const { userId, token } = useUserStore();
    const isOwner = userId === review.user.id;

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(review.title);
    const [editContent, setEditContent] = useState(review.content);
    const [editRating, setEditRating] = useState(review.reviewPoint);

    const initials = review.user?.name
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditTitle(review.title);
        setEditContent(review.content);
        setEditRating(review.reviewPoint);
    };

    const handleSave = async () => {
        try {
            const res = await axios.put(
                `http://localhost:6500/api/review/${review.id}`,
                {
                    title: editTitle,
                    content: editContent,
                    reviewPoint: editRating,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Review updated!');
            setIsEditing(false);
            onRefresh?.();
        } catch (err) {
            console.error('Edit failed:', err);
            alert(err.response?.data?.message || 'Failed to edit review.');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Delete this review?')) return;
        try {
            await axios.delete(`http://localhost:6500/api/review/${review.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Review deleted.');
            onRefresh?.();
        } catch (err) {
            console.error('Delete error:', err);
            alert(err.response?.data?.message || 'Failed to delete.');
        }
    };

    const handleReport = () => {
        alert('Reported this review.');
    };

    return (
        <div className="max-w-xl p-4 bg-[#f5eddc] rounded-xl border border-[#e3d9c3] shadow-sm text-[#3a2f27]">
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#3a2f27] flex items-center justify-center text-white font-semibold">
                    {initials}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold">{review.user.name}</h4>
                            <p className="text-sm text-[#82776b]">
                                {review.user.reviewCount} reviews<br />
                                {review.user.followerCount} followers
                            </p>
                        </div>
                        <FollowButton targetUserId={review.user.id} />
                    </div>

                    {/* Review Content */}
                    <div className="mt-2">
                        <div className="flex justify-between items-center text-sm mb-1">
                            <div className="flex gap-1 text-[#856600]">
                                {[...Array(editRating)].map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                                {[...Array(5 - editRating)].map((_, i) => (
                                    <span key={i} className="text-[#c4b089]">★</span>
                                ))}
                            </div>
                            <span className="text-xs text-[#a1978a]">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        {isEditing ? (
                            <div className="space-y-2 mt-2">
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full border px-2 py-1 rounded text-sm"
                                    placeholder="Title"
                                />
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="w-full border px-2 py-1 rounded text-sm"
                                    rows={3}
                                    placeholder="Content"
                                />
                                <input
                                    type="number"
                                    min={1}
                                    max={5}
                                    value={editRating}
                                    onChange={(e) => setEditRating(parseInt(e.target.value))}
                                    className="w-20 border px-2 py-1 rounded text-sm"
                                />
                                <div className="flex gap-2 mt-1">
                                    <button onClick={handleSave} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                                        Save
                                    </button>
                                    <button onClick={handleCancel} className="bg-gray-400 text-white px-3 py-1 rounded text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className="text-md font-semibold">{review.title}</p>
                                <p className="text-sm leading-relaxed mt-1">{review.content}</p>
                            </>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="mt-4 border-t border-[#dcd2c2] pt-2 text-sm text-[#82776b]">
                        <p className="mb-2">Was this review helpful?</p>
                        <div className="flex gap-4 text-xs">
                            <VoteButton />
                            <VoteButton />
                            <MoreMenu
                                onEdit={isOwner ? handleEdit : null}
                                onDelete={isOwner ? handleDelete : null}
                                onReport={handleReport}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard;
