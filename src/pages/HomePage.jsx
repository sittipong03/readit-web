import { SparklesIcon } from "../components/icons/sparkles-icon";
import { Button } from "../../components/ui/button";
import { LoaderCircle, WandSparklesIcon } from "lucide-react";
import { InputX } from "@/components/ui/inputX";
import homepagePic from "../assets/homepage-pic.png";
import { Link } from "react-router";

function HomePage() {
  return (
    <div className="dark">
      <div className="bg-paper-elevation-6 flex min-h-[calc(100dvh-(60px))] flex-col items-center justify-center gap-10 p-30">
        <img
          src={homepagePic}
          alt="homepagePic"
          className="h-[198px] w-[218px] object-cover"
        />
        <div className="flex flex-col gap-4 max-w-lg w-full items-center">
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
              trailingComponent={
                <Button color="tertiary" variant="contained">
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
export default HomePage;
