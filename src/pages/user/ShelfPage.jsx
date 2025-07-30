function Shelf() {
  return (
    <div className="flex h-[888px] w-full flex-col items-center justify-center">
      <div className="bg-paper-elevation-6 flex h-full w-full justify-center">
        <div className="border-action-active flex h-[824px] w-[1280px] items-center justify-center">
          <div className="flex h-[740px] w-[1180px] flex-col justify-between">
            <div className="flex h-[36px] w-full items-center justify-between">
              <div>
                <p className="h6 text-text-primary">Your Shelves</p>
              </div>
              <div className="bg-primary-soft text-primary-main border-primary-main font-button line-height-labalMedium border- rounded-full px-4 py-2">
                <button>Back to my feed</button>
              </div>
            </div>
            <div className="flex h-[668px] w-full justify-between">
              <div className="flex h-[160px] w-[240px] flex-col justify-between">
                <div className="bg-primary-soft font-button font-weight-Subtitle line-height-titlesmall tracking-titlesmall text-primary-main flex h-[48px] w-full items-center rounded-xl px-4 py-2">
                  <button className="subtitle-3">Readlist</button>
                </div>
                <div className="font-weight-Subtitle font-titleSmall line-height-titlesmall tracking-titlesmall flex h-[48px] w-full items-center rounded-xl px-4 py-2">
                  <button className="body-1">Read</button>
                </div>
                <div className="font-titleSmall font-weight-Subtitle line-height-titlesmall tracking-titlesmall flex h-[48px] w-full items-center rounded-xl px-4 py-2">
                  <button className="body-1">Favorites</button>
                </div>
              </div>
              <div className="flex h-full w-[900px] flex-col justify-between">
                <div className="flex h-[36px] w-full items-center justify-between">
                  <div className="text-text-secondary">
                    <p className="subtitle-1">Readlist</p>
                  </div>
                  <div className="bg-primary-main text-primary-contrast font-button line-height-labalMedium tracking-labelMedium rounded-full px-4 py-2">
                    <button>+ Add Book</button>
                  </div>
                </div>
                <div className="shadow-card-3d flex h-[608px] justify-center rounded-lg p-6">
                  <div className="flex h-[360px] flex-col items-center justify-between">
                    <div className="border-white-hover flex h-[44px] w-[852px] items-center border-b-2 pb-2">
                      <p className="subtitle-2">Reading (0/3)</p>
                    </div>
                    <div className="flex h-[128px] w-[852px] items-center"></div>
                    <div className="border-white-hover flex h-[44px] w-[852px] items-center border-b-2 pb-2">
                      <p className="subtitle-2">Wishlists</p>
                    </div>
                    <div className="flex h-[128px] w-[852px] items-center"></div>
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
