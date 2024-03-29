import { cx } from "alias";
import Container from "components/container";
import SocialIcon from "components/socialIcon";
import { mainSocialLinks } from "data/links";
import { typography } from "data/typography";
import Link from "next/link";

const webLinks = [
  { href: "/road-map", label: "Road map" },
  { href: "/site-map", label: "Site map" },
];

export default function Footer() {
  return (
    <div className="bg-zinc-900 py-8 shadow-xl shadow-zinc-50/50">
      <Container className="flex flex-row justify-between items-center">
        <div className="flex flex-row space-x-4">
          {webLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cx(
                "text-center underline underline-offset-4",
                "text-white/80 hover:text-white/100 transition-all",
                typography.small
              )}
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
        <div className="flex flex-row space-x-2">
          {mainSocialLinks.map((link) => {
            return (
              <Link href={link.url} target="_blank" key={link.url}>
                <SocialIcon name={link.name} className="lg:h-10 h-7" />
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
