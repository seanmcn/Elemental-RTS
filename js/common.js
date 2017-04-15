/**
 * Takes an x,y + width,height and return a from->to for x/y to find a unit based on selection area.
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns object
 */
function selectionAreaToCoordinates(x, y, width, height) {
    var coordinates = {};
    coordinates.x = {};
    coordinates.y = {};

    if(width < 0) {
        coordinates.x.from = x + width;
        coordinates.x.to = x;
    } else {
        coordinates.x.from = x;
        coordinates.x.to = x + width;
    }

    if(height < 0) {
        coordinates.y.from = y + height;
        coordinates.y.to = y;
    } else {
        coordinates.y.from = y;
        coordinates.y.to = y + height;
    }

    return coordinates;
}