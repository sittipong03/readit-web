import { Sparkles } from "lucide-react";
import { HeartIcon } from "../components/icons/heart-icon"
import { Button } from "../components/ui/button";
import { SparklesIcon } from "../components/icons/sparkles-icon";

function Home() {
  return (
    <div className="w-screen">
      <div className="flex flex-col items-center gap-4 p-4 bg-paper-elevation-6">
        <div className="text-center display-3 text-text-primary w-140">Discover Your Next Great Read. Instantly.</div>
        <div className="text-center body-1 text-text-secondary w-140">Describe your ideal read. Our AI will do the rest.</div>
        <Button color="tertiary" className="w-fit" leadingIcon={SparklesIcon}>Magically find your books</Button>
        <Button color="primary" className="w-fit" leadingIcon={Sparkles}>Magically find your books</Button>
        <Button color="secondary" className="w-fit" leadingIcon={Sparkles}>Magically find your books</Button>
        <Button variant="outlined" color="secondary" className="w-fit">Magically find your books</Button>
        <Button variant="mixed" color="error" className="w-fit">Magically find your books</Button>
        <Button variant="outlined" color="neutral" className="w-fit">Magically find your books</Button>
        <Button variant="outlined" color="neutral" loading="true" className="w-fit">Magically find your books</Button>
        <Button color="neutral" className="w-fit">Magically find your books</Button>
        <Button variant="outlined" color="neutral" className="w-fit">Magically find your books</Button>
        <Button variant="text" color="neutral" className="w-fit">Magically find your books</Button>
        <Button variant="ghost" color="neutral" className="w-fit">Magically find your books</Button>
        <Button variant="mixed" color="neutral" className="w-fit">Magically find your books</Button>
        <HeartIcon size={72} className="text-text-disabled" />
      </div>
    </div>
  );
}
export default Home;
