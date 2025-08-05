import { Button } from "@/components/ui/button";
import { ReaditLogo } from "../assets/readit";
import { FacebookLogo, Discord } from "../icons/Index";

function Footer() {
  return (
    <footer className="dark">
      <div className="bg-paper-elevation-2 flex w-full flex-col items-center justify-center gap-6 pt-10 pb-6">
        <div className="m-0 flex w-full max-w-lg justify-between p-5">
          <div className="text-secondary-darker flex w-[280px] flex-col gap-2">
            <p className="subtitle-2">Relearn Solutions Co., Ltd.</p>
            <p className="body-2 text-secondary-dark">
              35 Wansorn Building, 12th Floor A, Room No. 1303 Phaya Thai Road,
              Thanon Phaya Thai Subdistrict, Ratchathewi District Bangkok 10400
            </p>
            <span className="flex items-center gap-3">
              <i className="fa-regular fa-phone"></i>083-795-1555
            </span>
            <span className="flex items-center gap-3">
              <i className="fa-regular fa-envelope"></i>relearn.acc@gmail.com
            </span>
            {/* <div className="mt-5 flex gap-3">
              <p>Term of service</p>
              <p>Privacy Notice</p>
              <p>Cookie preference</p>
            </div> */}
          </div>
          <div className="text-secondary-darker flex flex-col items-end gap-4">
            <a href="/home">
              <ReaditLogo size={20} className="text-secondary-dark mb-10 hover:text-secondary-darker transition-all" />
            </a>
            <div className="flex gap-3">
              <i class="fa-brands fa-facebook"></i>
              <i class="fa-brands fa-discord"></i>
            </div>
            {/* <p>Version 0.1.0 © 2025 Readit. All Rights Reserved</p> */}
          </div>
        </div>
        <div className="m-0 flex w-full max-w-lg justify-between p-5">
          <div className="text-secondary-darker flex gap-4">
            <Button
              variant="link"
              asChild
              color="neutral"
              size="small"
              className="!body-3 text-text-disabled font-regular"
            >
              <a href="/book">Term of service</a>
            </Button>
            <Button
              variant="link"
              asChild
              color="neutral"
              size="small"
              className="!body-3 text-text-disabled font-regular"
            >
              <a href="/book">Privacy Notice</a>
            </Button>
            <Button
              variant="link"
              asChild
              color="neutral"
              size="small"
              className="!body-3 text-text-disabled font-regular"
            >
              <a href="/book">Cookie preference</a>
            </Button>
          </div>
          <div className="text-text-disabled body-3 flex flex-col items-end gap-4">
            <p>Version 0.1.0 © 2025 Readit. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
