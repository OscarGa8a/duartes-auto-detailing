import { config } from "./config";
import { priorityServiceAreaCities, serviceAreaHub, type ServiceAreaCity } from "./service-areas";
import { services, type Service } from "./services";
import { socialNetworks } from "./social-networks";

const businessId = "#duartes-auto-detailing";
const websiteId = "#website";
const logoPath = "/images/logo.png";

const getOrigin = (site: URL) => new URL("/", site).href;
const getUrl = (site: URL, path = "/") => new URL(path, site).href;
const getBusinessId = (site: URL) => new URL(businessId, site).href;
const getWebsiteId = (site: URL) => new URL(websiteId, site).href;

type BreadcrumbItem = {
  name: string;
  path: string;
};

const serviceArea = {
  "@type": "AdministrativeArea",
  name: "Bay Area, California",
};

const getCityAreaServed = (city: ServiceAreaCity) => ({
  "@type": "City",
  name: `${city.name}, California`,
  containedInPlace: serviceArea,
});

export const business = {
  name: "Duartes Auto Detailing",
  serviceAreaName: serviceArea.name,
  description:
    "Premium mobile auto detailing for Bay Area drivers, delivered at homes, offices, and private garages.",
};

const sameAs = socialNetworks
  .map(({ href }) => href)
  .filter((href) => href.startsWith("https://") && !href.includes("wa.me"));

export const getLocalBusinessJsonLd = (site: URL) => ({
  "@context": "https://schema.org",
  "@type": "AutoWash",
  "@id": getBusinessId(site),
  name: business.name,
  url: getOrigin(site),
  description: business.description,
  telephone: config.phoneUSE164,
  image: getUrl(site, logoPath),
  logo: getUrl(site, logoPath),
  areaServed: serviceArea,
  sameAs,
  makesOffer: services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.name.trim(),
      description: service.tagline,
      serviceType: service.name.trim(),
      areaServed: serviceArea,
      provider: {
        "@id": getBusinessId(site),
      },
    },
  })),
});

export const getWebSiteJsonLd = (site: URL) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": getWebsiteId(site),
  name: business.name,
  url: getOrigin(site),
  publisher: {
    "@id": getBusinessId(site),
  },
});

export const getServicesItemListJsonLd = (site: URL) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Mobile auto detailing services",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.name.trim(),
    url: getUrl(site, `/services/${service.slug}`),
  })),
});

export const getServiceJsonLd = (site: URL, service: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": getUrl(site, `/services/${service.slug}#service`),
  name: service.name.trim(),
  description: service.description,
  serviceType: service.name.trim(),
  url: getUrl(site, `/services/${service.slug}`),
  areaServed: serviceArea,
  provider: {
    "@id": getBusinessId(site),
  },
});

export const getBreadcrumbListJsonLd = (site: URL, items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: getUrl(site, item.path),
  })),
});

export const getServiceAreaHubJsonLd = (site: URL) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": getUrl(site, `/service-area/${serviceAreaHub.slug}/#service`),
  name: "Bay Area mobile auto detailing",
  description: serviceAreaHub.metaDescription,
  serviceType: "Mobile auto detailing",
  url: getUrl(site, `/service-area/${serviceAreaHub.slug}/`),
  areaServed: [serviceArea, ...priorityServiceAreaCities.map(getCityAreaServed)],
  provider: {
    "@id": getBusinessId(site),
  },
});

export const getCityServiceAreaJsonLd = (site: URL, city: ServiceAreaCity) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": getUrl(site, `/service-area/${city.slug}/#service`),
  name: `Mobile auto detailing in ${city.name}`,
  description: city.metaDescription,
  serviceType: "Mobile auto detailing",
  url: getUrl(site, `/service-area/${city.slug}/`),
  areaServed: getCityAreaServed(city),
  provider: {
    "@id": getBusinessId(site),
  },
});
