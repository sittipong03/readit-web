import { SparklesIcon } from "@/src/components/icons/sparkles-icon";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputX } from "@/components/ui/inputX";

//http://localhost:5173/buttontest

function ButtonTest() {
  return (
    <div className="dark w-full">
      <div className="bg-paper-elevation-6 flex min-h-screen flex-col items-center gap-16 p-8">
        <div className="display-3 text-text-primary flex w-140 items-center gap-4 text-center">
          Button Test
          <Button variant="contained" asChild={true} color="tertiary">
            <a href="https://fontawesome.com/search" target="_blank">
              Font Awesome Link
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button variant="contained" className="rounded-md">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button variant="contained">
            <i class="fa-solid fa-sparkles"></i> Test{" "}
          </Button>

          <Button variant="outlined" size="large">
            <i class="fa-solid fa-house"></i> Test FontAwesome{" "}
          </Button>
          <Button variant="outlined">
            <i class="fa-solid fa-house"></i> Test FontAwesome{" "}
          </Button>
          <Button variant="outlined" size="small">
            <i class="fa-solid fa-house"></i> Test FontAwesome{" "}
          </Button>
          <Button variant="outlined">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button variant="text">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button variant="ghost">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button variant="mixed">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button variant="link">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="secondary" variant="contained">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="secondary" variant="outlined">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="secondary" variant="text">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="secondary" variant="ghost">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="secondary" variant="mixed">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="secondary" variant="link">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="tertiary" variant="contained">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="tertiary" variant="outlined">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="tertiary" variant="text">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="tertiary" variant="ghost">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="tertiary" variant="mixed">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="tertiary" variant="link">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="error" variant="contained">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="error" variant="outlined">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="error" variant="text">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="error" variant="ghost">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="error" variant="mixed">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="error" variant="link">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button disabled variant="contained">
            <SparklesIcon /> Test Disabled{" "}
          </Button>
          <Button disabled variant="outlined">
            <SparklesIcon /> Test Disabled{" "}
          </Button>
          <Button disabled variant="text">
            <SparklesIcon /> Test Disabled{" "}
          </Button>
          <Button disabled variant="ghost">
            <SparklesIcon /> Test Disabled{" "}
          </Button>
          <Button disabled variant="mixed">
            <SparklesIcon /> Test Disabled{" "}
          </Button>
          <Button disabled variant="link">
            <SparklesIcon /> Test Disabled{" "}
          </Button>
          <Button color="neutral" variant="contained">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="neutral" variant="outlined">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="neutral" variant="text">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="neutral" variant="ghost">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="neutral" variant="mixed">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button color="neutral" variant="link">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button variant="outlined" color="tertiary">
            <SparklesIcon /> Test{" "}
          </Button>
          <Button variant="outlined" disabled>
            <LoaderCircle className="animate-spin" /> Test{" "}
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              id="pictureX"
              label="Test"
              type="email"
              placeholder="Find books..."
              className="rounded-md"
              leadingComponent={<i class="fa-solid fa-book-open-cover"></i>}
              trailingComponent={<span>.com</span>}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="pictureX">Picture</Label>
            <InputX
              id="pictureX"
              type="file"
              trailingComponent={<i class="fa-solid fa-file-image"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              size="small"
              leadingComponent={<i class="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              variant="filled"
              leadingComponent={<i class="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              leadingComponent={<i class="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              variant="filled"
              leadingComponent={<i class="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              color="primary"
              leadingComponent={<i class="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              color="primary"
              variant="filled"
              leadingComponent={<i class="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              color="neutral"
              leadingComponent={<i class="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              color="neutral"
              variant="filled"
              leadingComponent={<i class="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              color="error"
              leadingComponent={<i class="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              color="error"
              variant="filled"
              leadingComponent={<i class="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              color="primary"
              disabled
              leadingComponent={<i class="fa-solid fa-book-open-cover"></i>}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <InputX
              label="Test"
              id="pictureX"
              type="email"
              placeholder="Find books..."
              variant="filled"
              disabled
              leadingComponent={<i class="fa-solid fa-book-open-cover"></i>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ButtonTest;
