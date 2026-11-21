import "server-only";
import { Stat, CarouselItem, Service, Media } from "../app/models/Profile";

export async function getProfileData() {
  const order = [["sortOrder", "ASC"]];
  const [stats, carousel, services, media] = await Promise.all([
    Stat.findAll({ order, raw: true }),
    CarouselItem.findAll({ order, raw: true }),
    Service.findAll({ order, raw: true }),
    Media.findAll({ order, raw: true }),
  ]);
  return { stats, carousel, services, media };
}