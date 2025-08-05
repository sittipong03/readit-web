import React from 'react';
import VoteButton from './VoteButton';
import MoreMenu from './MoreMenu';

function ReviewCard({ review }) {
  const { user, rating, content, date } = review;

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="max-w-xl p-4 bg-[#f5eddc] rounded-xl border border-[#e3d9c3] shadow-sm text-[#3a2f27]">
      <div className="flex items-start gap-4">
        {/* Profile Avatar */}
        <div className="w-12 h-12 rounded-full bg-[#3a2f27] flex items-center justify-center text-white font-semibold">
          {initials}
        </div>

        {/* User Info + Follow */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold">{user.name}</h4>
              <p className="text-sm text-[#82776b]">
                {user.reviewCount} reviews<br />
                {user.followerCount} followers
              </p>
            </div>
            <button className="bg-[#82776b] text-white px-4 py-1 rounded-full text-sm hover:bg-[#6f665c] transition">
              Follow
            </button>
          </div>

          {/* Review Content */}
          <div className="mt-2">
            <div className="flex justify-between items-center text-sm text-[#3a2f27] mb-1">
              <div className="flex gap-1 text-[#856600]">
                {[...Array(rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
                {[...Array(5 - rating)].map((_, i) => (
                  <span key={i} className="text-[#c4b089]">★</span>
                ))}
              </div>
              <span className="text-xs text-[#a1978a]">
                {new Date(date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <p className="text-sm leading-relaxed mt-1">{content}</p>
          </div>

          {/* Interaction Bar */}
          <div className="mt-4 border-t border-[#dcd2c2] pt-2 text-sm text-[#82776b]">
            <p className="mb-2">Was this review helpful?</p>
            <div className="flex gap-4 text-xs">
              <VoteButton />
              <VoteButton />
              <MoreMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;