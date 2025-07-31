import { FacebookLogo, Discord } from "../icons/Index";

function Footer() {
  return (
    <footer className="flex justify-between bg-[#13120f] p-5">
      <div className="mb-5 w-1/2 text-[#cfc6aa]">
        <h3 className="mb-4 text-2xl font-bold text-[#cfc6aa]">
          Relearn solution
        </h3>
        <p>Wanason Building 12th floor A, Room</p>
        <p>📞 083-795-1555</p>
        <p>✉️ relearn.acc@gmail.com</p>
        <div className="mt-5 flex gap-3">
          <p>Term of service</p>
          <p>Privacy Notice</p>
          <p>Cookie preference</p>
        </div>
      </div>
      <div className="flex w-1/2 flex-col items-end text-[#cfc6aa]">
        <h2 className="mb-5 text-2xl font-bold">Readit</h2>
        <div className="flex">
          <FacebookLogo className="w-7" />
          <Discord className="w-7" />
        </div>
        <p>Version 0.1.0 © 2025 Readit. All Rights Reserved</p>
      </div>
    </footer>
  );
}
export default Footer;
