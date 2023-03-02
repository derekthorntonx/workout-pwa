function CurrentRoutine({ currentRoutine }) {
    let t1Range, t2Range, t3Range
    switch (currentRoutine.data.cycle){
        case 1:
            t1Range = 10
            t2Range = 12
            t3Range = 16
            break
        
        case 2: 
            t1Range = 8
            t2Range = 10
            t3Range = 14
            break

        case 3: 
            t1Range = 6
            t2Range = 8
            t3Range = 12
            break

        default:
            break
    }

    return (
        <div>
            <div>{currentRoutine.data.name}</div>

            <div>
                {currentRoutine.data.t1}
                {`3 x ${t1Range}`}
            </div>

            <div>
                {currentRoutine.data.t2s}
                {`3 x ${t2Range}`}
            </div>

            <div>
                {currentRoutine.data.t3s}
                {`3 x ${t3Range}`}
            </div>

        </div>
    )
}

export default CurrentRoutine