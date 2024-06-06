import React from "react";
import { NextraBlogTheme } from "nextra-theme-blog";
const year = new Date().getFullYear();
const config: NextraBlogTheme = {
  // project: {
  //   link: "https://github.com/HuanBaby1314/blog",
  // },
  // chat: {
  //   link: "https://discord.gg/2Px4u52v",
  // },
  head: ({ title, meta }) => (
    <>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
    </>
  ),
  footer: <p className="text-center">© {year} Jack Huan</p>,
  darkMode: true,
};

export default config;
