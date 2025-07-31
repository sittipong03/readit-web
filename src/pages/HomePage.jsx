import { SparklesIcon } from "../components/icons/sparkles-icon";
import { Button } from "../../components/ui/button";
import { LoaderCircle } from "lucide-react"

function Home() {
  return (
    <div className="w-screen dark">
      <div className="flex flex-col items-center gap-4 p-4 bg-paper-elevation-6">
        <div className="text-center display-3 text-text-primary w-140">
          Discover Your Next Great Read. Instantly.
        </div>
        <div className="text-center body-1 text-text-secondary w-140">
          Describe your ideal read. Our AI will do the rest.
        </div>
        <Button variant="contained"><SparklesIcon /> Test </Button>
        <Button variant="contained"><i className="fa-solid fa-sparkles"></i> Test </Button>
        <Button variant="contained" asChild={true}><a href="https://www.google.com" target="_blank">Test</a></Button>
        <Button variant="outlined" size="large"><i className="fa-solid fa-house"></i> Test FontAwesome </Button>
        <Button variant="outlined"><i className="fa-solid fa-house"></i> Test FontAwesome </Button>
        <Button variant="outlined" size="small"><i className="fa-solid fa-house"></i> Test FontAwesome </Button>
        <Button variant="outlined"><SparklesIcon /> Test </Button>
        <Button variant="text"><SparklesIcon /> Test </Button>
        <Button variant="ghost"><SparklesIcon /> Test </Button>
        <Button variant="mixed"><SparklesIcon /> Test </Button>
        <Button variant="link"><SparklesIcon /> Test </Button>
        <Button color="secondary" variant="contained"><SparklesIcon /> Test </Button>
        <Button color="secondary" variant="outlined"><SparklesIcon /> Test </Button>
        <Button color="secondary" variant="text"><SparklesIcon /> Test </Button>
        <Button color="secondary" variant="ghost"><SparklesIcon /> Test </Button>
        <Button color="secondary" variant="mixed"><SparklesIcon /> Test </Button>
        <Button color="secondary" variant="link"><SparklesIcon /> Test </Button>
        <Button color="tertiary" variant="contained"><SparklesIcon /> Test </Button>
        <Button color="tertiary" variant="outlined"><SparklesIcon /> Test </Button>
        <Button color="tertiary" variant="text"><SparklesIcon /> Test </Button>
        <Button color="tertiary" variant="ghost"><SparklesIcon /> Test </Button>
        <Button color="tertiary" variant="mixed"><SparklesIcon /> Test </Button>
        <Button color="tertiary" variant="link"><SparklesIcon /> Test </Button>
        <Button color="error" variant="contained"><SparklesIcon /> Test </Button>
        <Button color="error" variant="outlined"><SparklesIcon /> Test </Button>
        <Button color="error" variant="text"><SparklesIcon /> Test </Button>
        <Button color="error" variant="ghost"><SparklesIcon /> Test </Button>
        <Button color="error" variant="mixed"><SparklesIcon /> Test </Button>
        <Button color="error" variant="link"><SparklesIcon /> Test </Button>
        
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
