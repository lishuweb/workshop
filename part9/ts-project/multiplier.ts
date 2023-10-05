export type Operation = 'multiply' | 'add' | 'divide';
type Result = number | string;

export const multiplicator = (a: number, b: number, operation: Operation): Result => {
    if(operation === 'multiply')
    {
        if(a === 0) 
        {
            throw new Error("Can't divide by 0!");
        }
        return a * b;
    }
    else if( operation === 'add')
    {
        return a + b;
    }
    else if(operation === 'divide')
    {
        return a / b;
    }
    return "Not a valid opeerator";
};

try {
    console.log(multiplicator(0, 4, "multiply"));
}
catch(e: unknown)
{
    if(e instanceof Error)
    {
        console.log("Error is:", e.message);
    }
}
