export function generateEmptyGrid(width, height) {
    const grid = [];
    for (let i = 0; i < height; i++) {
        grid.push(Array.from(Array(width), () => 0));
    }
    return grid;
} 

export function cellSize(width){
    if (width <= 25) {
        return '3vw';
    } else if (width <= 40) {
        return '2vw';
    } else if (width <= 60){
        return '1.3vw';
    } else {
        return '0.8vw'
    }
}