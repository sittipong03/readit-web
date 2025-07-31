import React from 'react'

import VoteButton from './VoteButton'
import MoreMenu from './MoreMenu'

function ReviewCard({ user }) {
    return (
        <div className="max-w-xl p-4 bg-[#f5eddc] rounded-xl border border-[#e3d9c3] shadow-sm text-[#3a2f27]">
            <div className="flex items-start gap-4">
                {/* Profile Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#3a2f27] flex items-center justify-center text-white font-semibold">
                    UM
                </div>

                {/* User Info + Follow */}
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold">Ukrit Meeklin</h4>
                            <p className="text-sm text-[#82776b]">
                                1,458 reviews<br />
                                34 followers
                            </p>
                        </div>
                        <button className="bg-[#82776b] text-white px-4 py-1 rounded-full text-sm hover:bg-[#6f665c] transition">
                            Follow
                        </button>
                    </div>

                    {/* Review Content */}
                    <div className="mt-2">
                        {/* Rating + Date */}
                        <div className="flex justify-between items-center text-sm text-[#3a2f27] mb-1">
                            <divicon className="flex gap-1 text-[#856600]">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} />
                                ))}
                                <div className="text-[#c4b089]" /> {/* dimmed star */}
                            </divicon>
                            <span className="text-xs text-[#a1978a]">September 3, 2022</span>
                        </div>

                        {/* Review Text */}
                        <p className="text-sm leading-relaxed mt-1">
                            This story left me in a bit of a perplexed daze. Intriguing,
                            atmospheric and yet frustratingly smudged at the edges, just to the
                            point where I feel that if I just squint and think hard enough I’d
                            “get” it — except for I don’t quite do. It’s just too opaquely
                            dreamlike for hard logic.
                        </p>
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

export default ReviewCard