import { Button } from "../../components/ui/button";
import { WandSparklesIcon } from "lucide-react";
import { Link } from "react-router";
import { InputX } from "@/components/ui/inputX";
import homepagePic from "../assets/homepage-pic.png";
import { useNavigate } from "react-router";


function LandingPage() {
  const navigate = useNavigate();
  const sendShimmer = () => {
    const sendData = document.getElementById("pictureX").value
    navigate('/home', { state: { prompt: sendData } });

  }
  return (
    <div className="dark">
      <div className="bg-paper-elevation-6 flex min-h-[calc(100dvh-(60px))] flex-col items-center justify-end gap-10 p-30">
        <img
          src={homepagePic}
          alt="homepagePic"
          className="h-[198px] w-[218px] object-cover"
        />
        <div className="flex w-full max-w-lg flex-col items-center gap-4">
          <div className="display-3 text-text-primary w-140 text-center">
            Discover Your Next Great Read. Instantly.
          </div>
          <div className="body-1 text-text-secondary w-140 text-center">
            Describe your ideal read. Our AI will do the rest.
          </div>
          <div className="mt-4 w-full max-w-lg">
            <InputX
              id="pictureX"
              name="ISBN"
              placeholder="e.g., Epic fantasy book with ancient evil, unlikely heroes, and magical journey"
              className="h-16 w-full"
              onKeyDown={(e) => e.key === 'Enter' && sendShimmer()}
              trailingComponent={
                <Button color="tertiary" variant="contained" onClick={() => sendShimmer()}>
                  <WandSparklesIcon />
                  Shimmer
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
