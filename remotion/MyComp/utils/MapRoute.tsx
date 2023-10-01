import { useEffect, useRef, useState } from "react";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import mapboxgl, { Map, MercatorCoordinate } from "mapbox-gl";
import * as turf from "@turf/turf";
import { routes } from "./Routes";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhandhbGdhaXJlIiwiYSI6ImNsbjU0bzZobjA4OXoyaXFlMXozaGRoZjMifQ.rEhNs2ukeoVrHP_g2VDxWQ";

export const MapComp = () => {
  const ref = useRef<HTMLDivElement>(null);

  const targetRoute = routes.target;
  // This is the path the camera will move along
  const cameraRoute = routes.camera;

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [handle] = useState(() => delayRender("Loading map..."));
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    const _map = new Map({
      container: "map",
      zoom: 11.53,
      center: [85.30673326686923, 27.704450608308917],
      pitch: 75,
      bearing: -180,
      style: "mapbox://styles/jonnyburger/clgtb8stl002z01o5d15ye0u0",
      interactive: false,
      fadeDuration: 0,
    });

    _map.on("style.load", () => {
      _map.addSource("trace", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: targetRoute,
          },
        },
      });
      _map.addLayer({
        type: "line",
        source: "trace",
        id: "line",
        paint: {
          "line-color": "black",
          "line-width": 5,
        },
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
      });
    });

    _map.on("load", () => {
      continueRender(handle);
      setMap(_map);
    });
  }, [handle, targetRoute]);

  useEffect(() => {
    if (!map) {
      return;
    }
    const handle = delayRender("Moving point...");

    const animationDuration = 10000;
    const cameraAltitude = 10000;
    // Get the overall distance of each route so we can interpolate along them
    const routeDistance = turf.lineDistance(turf.lineString(targetRoute));
    const cameraRouteDistance = turf.lineDistance(turf.lineString(cameraRoute));

    const start = 0;

    const time = (frame / fps) * 800;
    // Phase determines how far through the animation we are
    const phase = (time - start) / animationDuration;

    // Use the phase to get a point that is the appropriate distance along the route
    // this approach syncs the camera and route positions ensuring they move
    // at roughly equal rates even if they don't contain the same number of points
    const alongRoute = turf.along(
      turf.lineString(targetRoute),
      routeDistance * phase
    ).geometry.coordinates;

    const alongCamera = turf.along(
      turf.lineString(cameraRoute),
      cameraRouteDistance * phase
    ).geometry.coordinates;

    const camera = map.getFreeCameraOptions();

    // Set the position and altitude of the camera
    camera.position = MercatorCoordinate.fromLngLat(
      {
        lng: alongCamera[0],
        lat: alongCamera[1],
      },
      cameraAltitude
    );

    // Tell the camera to look at a point along the route
    camera.lookAtPoint({
      lng: alongRoute[0],
      lat: alongRoute[1],
    });

    map.setFreeCameraOptions(camera);
    map.once("idle", () => continueRender(handle));
  }, [cameraRoute, fps, frame, handle, map, targetRoute]);

  return <AbsoluteFill ref={ref} id="map" />;
};
