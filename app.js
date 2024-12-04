function escape(carpark){
    const instructions = []
    const floors = carpark.length
    const cells = carpark[0].length

    const [posX, posY] = findOurPosition(carpark)
    while(posX !== floors - 1 || posY !== cells-1){
        const stairY = findStair(carpark[posX])
        if(stairY === -1) { //no hay escalera, estamos en el piso de abajo
            const spaces = cells - 1 -posY
            instructions.push(`R${spaces}`)
            posY += spaces 
        } else {
            const spaces = stairY - posY
            const direction = spaces < 0 ? "L" : "R"
                instructions.push(direction + Math.abs(spaces))
            posY += spaces
        }

        //movenros hacia abajo
        let spacesDown = 0
        for(let i=posX; i < floors && carpark[i][stairY] === 1; i++){
            spacesDown++
        }
        instructions.push(`D${spacesDown}`)
        posX += spacesDown
    } 
    return instructions
}

function findOurPosition(carpark){
    for(let i=0; i <carpark.length; i++){
        for (let j=0; j < carpark[i].length; j++){
            if (carpark[i][j] === 2) return [i, j]
        }
    }
}

function findStair(floor) {
    for(let i=0; i < floor.length; i++){
        if (floor[i] === 1) return i
    }

    return -1
}