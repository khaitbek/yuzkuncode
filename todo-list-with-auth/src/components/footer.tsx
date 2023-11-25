import { LucideHeart } from "lucide-react";
import { Paragraph } from "./ui/typography";

export function Footer() {
  return (
    <footer className="py-6">
      <div className="container">
        <Paragraph className="text-center">
          Made with <LucideHeart className="inline" color="crimson" /> by
          @khaitbek
        </Paragraph>
      </div>
    </footer>
  );
}
