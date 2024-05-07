class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    minus(other) {
        return new Vector(this.x-other.x, this.y-other.y, this.z-other.z);
    }

    dot(other) {
        return this.x*other.x + this.y*other.y + this.z*other.z;
    }

    cross(other) {
        return new Vector(
            this.y*other.z - this.z*other.y,
            this.z*other.x - this.x*other.z,
            this.x*other.y - this.y*other.x
        );
    }

    magnitude() {
        return Math.sqrt(this.dot(this));
    }

    divide(scalar) {
        return new Vector(this.x/scalar, this.y/scalar, this.z/scalar);
    }

    normalize() {
        return this.divide(this.magnitude());
    }
}

const cameraOrigin = new Vector(0, 0, 720);
const buffer = new Array(24);

for (let i = 0; i < 24; i++) {
    buffer[i] = new Array(40);
}

function calculateBuffer() {
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 40; j++) {
            buffer[i][j] = traceRay(i * 30 - 360, j * 30 - 600);
        }
    }
}

function traceRay(x, y) {
    // draw a ray from the camera at (0, 0, 720) to the screen at (x, y, 0)
    const ray = new Vector(x, y, -720).normalize();
    // does it intersect any polygons?
    // that is, for each polygon (Möller–Trumbore intersection):

    // does the ray intersect the polygon's plane?
    const e1 = new Vector(360, 0, 0);
    const e2 = new Vector(0, 360, 0);
    const ray_cross_e2 = ray.cross(e2);
    const det = e1.dot(ray_cross_e2);
    // if no, no intersection; return space
    if (det > -Number.EPSILON && det < Number.EPSILON) {
        return " ";
    }

    // if yes, at what point?
    // is the point inside the polygon? return the result or space
    const inv_det = 1/det;
    const s = cameraOrigin.minus(new Vector(-180, -180, 180));
    const u = inv_det * s.dot(ray_cross_e2);
    if (u < 0 || u > 1) {
        return " ";
    }

    const s_cross_e1 = s.cross(e1);
    const v = inv_det * ray.dot(s_cross_e1);
    if (v < 0 || u+v > 1) {
        return " ";
    }

    return "A";
}

function displayBuffer() {
    const screen = buffer.reduce((acc, line) => {
        return acc + line.join("") + "\n";
    }, "");
    document.getElementById("content").textContent = screen;
}

calculateBuffer();
displayBuffer();
