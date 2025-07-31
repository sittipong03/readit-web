import { SparklesIcon } from "../components/icons/sparkles-icon";
import { Button } from "../components/ui/button";
import { LoaderCircle } from "lucide-react"

function Home() {
  return (
    <div className=" w-screen">
      <div className="bg-paper-elevation-6 flex flex-col items-center gap-4 p-4">
        <div className="display-3 text-text-primary w-140 text-center">
          Discover Your Next Great Read. Instantly.
        </div>
        <div className="body-1 text-text-secondary w-140 text-center">
          Describe your ideal read. Our AI will do the rest.
        </div>
        <Button variant="contained"><SparklesIcon /> Test </Button>
        <Button variant="outlined"><SparklesIcon /> Test </Button>
        <Button variant="text"><SparklesIcon /> Test </Button>
        <Button variant="ghost"><SparklesIcon /> Test </Button>
        <Button variant="mixed"><SparklesIcon /> Test </Button>
        <Button variant="link"><SparklesIcon /> Test </Button>
        <Button disabled variant="contained"><SparklesIcon /> Test Disabled </Button>
        <Button disabled variant="outlined"><SparklesIcon /> Test Disabled </Button>
        <Button disabled variant="text"><SparklesIcon /> Test Disabled </Button>
        <Button disabled variant="ghost"><SparklesIcon /> Test Disabled </Button>
        <Button disabled variant="mixed"><SparklesIcon /> Test Disabled </Button>
        <Button disabled variant="link"><SparklesIcon /> Test Disabled </Button>
        <Button color="neutral" variant="contained"><SparklesIcon /> Test </Button>
        <Button color="neutral" variant="outlined"><SparklesIcon /> Test </Button>
        <Button color="neutral" variant="text"><SparklesIcon /> Test </Button>
        <Button color="neutral" variant="ghost"><SparklesIcon /> Test </Button>
        <Button color="neutral" variant="mixed"><SparklesIcon /> Test </Button>
        <Button color="neutral" variant="link"><SparklesIcon /> Test </Button>
        <Button variant="outlined" color="tertiary"><SparklesIcon /> Test </Button>
        <Button variant="outlined" disabled><LoaderCircle className="animate-spin"/> Test </Button>
      </div>
    </div>
  );
}
export default Home;
