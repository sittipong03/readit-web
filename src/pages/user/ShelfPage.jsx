function Shelf() {
  return (
    <div className="flex h-[888px] w-full flex-col items-center justify-center">
      <div className="bg-paper-elevation-6 flex h-full w-full justify-center">
        <div className="border-action-active flex h-[824px] w-[1280px] items-center justify-center border-2">
          <div className="flex h-[740px] w-[1180px] flex-col justify-between border-2">
            <div className="flex h-[36px] w-full items-center justify-between border-4">
              <div className="text-text-primary font-display font-sans">
                Your Shelves
              </div>
              <div className="text-primary-main border-primary-main text-labelMedium rounded-xl border-2 px-[8px] py-1">
                Back to my feed
              </div>
            </div>
            <div className="flex h-[668px] w-full justify-between border-4">
              <div className="h-[160px] w-[240px] border-2"></div>
              <div className="flex h-full w-[900px] flex-col justify-between border-2">
                <div className="flex h-[36px] w-full items-center justify-between border-2">
                  <div className="font-subtitle text-titleLarge text-text-secondary">
                    Readlist
                  </div>
                  <div>+ Add Book</div>
                </div>
                <div className="shadow-card-3d flex h-[608px] justify-center p-6">
                  <div className="flex h-[360px] flex-col items-center justify-between">
                    <div className="h-[44px] w-[852px] border-2">
                      Reading (0/3)
                    </div>
                    <div className="h-[128px] w-[852px] border-2"></div>
                    <div className="h-[44px] w-[852px] border-2">Wishlists</div>
                    <div className="h-[128px] w-[852px] border-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Shelf;
