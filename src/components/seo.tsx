import { Helmet, HelmetProvider } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export const SEO = ({ title, description, keywords, ogImage }: SEOProps) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>
          {title.toLowerCase().includes("chronica")
            ? title
            : `${title} | Chronica`}
        </title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
};
