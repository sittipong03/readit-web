import { Button } from "../../components/ui/button";
import { LoaderCircle, WandSparklesIcon } from "lucide-react";
import { InputX } from "@/components/ui/inputX";
import homepagePic from "../assets/homepage-pic.png";
import { useNavigate } from "react-router";
import { LavaLampBackground } from "../components/MovingGradientBackground";


function LandingPage() {
  const navigate = useNavigate();
  const sendShimmer = () => {
    const sendData = document.getElementById("pictureX").value;
    navigate("/book", { state: { prompt: sendData } });

    console.log(sendData);
    // return sendData
  };
  return (
    <div className="dark">
      <div>
        <LavaLampBackground className="bg-paper-elevation-6 flex min-h-[calc(100dvh-(60px))] flex-col items-center justify-center gap-10 p-30">
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
                className="h-16 w-full pl-8"
                onKeyDown={(e) => e.key === "Enter" && sendShimmer()}
                trailingComponent={
                  <Button
                    color="tertiary"
                    variant="contained"
                    onClick={() => sendShimmer()}
                  >
                    <WandSparklesIcon />
                    Shimmer
                  </Button>
                }
              />
            </div>
          </div>
        </LavaLampBackground>
      </div>
    </div>
  );
}
export default LandingPage;
