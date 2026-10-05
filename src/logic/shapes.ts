import { type DrawBrushes, type DrawShape } from '@lichess-org/chessground/draw';
import * as THREE from 'three';

import { createArrowMesh, createCircleMesh, createCustomSvgMesh } from '../objects/createShapes';

import { keyToCoordinates } from './util';

export function disposeShape(shape: THREE.Mesh) {
  shape.geometry.dispose();
  if (shape.material instanceof THREE.MeshBasicMaterial && shape.material.map) {
    shape.material.map.dispose();
  }
  (shape.material as THREE.Material).dispose();
}

export function clearShapes(group: THREE.Group) {
  for (const child of group.children) {
    if (child instanceof THREE.Mesh) {
      disposeShape(child);
    }
  }
  group.clear();
}

export function updateShapes(group: THREE.Group, shapes: readonly DrawShape[], brushes: DrawBrushes) {
  clearShapes(group);

  for (const shape of shapes) {
    const orig = keyToCoordinates(shape.orig);
    if (!orig) {
      continue;
    }

    if (shape.customSvg) {
      const customSvg = shape.customSvg as string | { html?: string };
      const html = typeof customSvg === 'string' ? customSvg : customSvg.html;
      if (html) {
        group.add(createCustomSvgMesh(orig.x, orig.z, html));
      }
      continue;
    }

    if (!shape.brush) {
      continue;
    }

    const brush = brushes[shape.brush];
    if (!brush) {
      continue;
    }

    if (!shape.dest || shape.dest === shape.orig) {
      group.add(createCircleMesh(orig.x, orig.z, brush.color, brush.opacity));
      continue;
    }

    const dest = keyToCoordinates(shape.dest);
    if (!dest) {
      continue;
    }

    group.add(createArrowMesh(orig.x, orig.z, dest.x, dest.z, brush.color, brush.opacity));
  }
}
