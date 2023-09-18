import useField from "./hooks/useField";

const App = () => {
    const name = useField("text");
    const born = useField("date");
    const height = useField("number");
  
    return (
        <div>
            
            <form>
                name: 
                <input {...name} /> 
                <br/> 
                birthdate:
                <input {...born} />
                <br /> 
                height:
                <input {...height} />
            </form>

            <div>
                {name.value} <br/>
                {born.value} <br />
                {height.value} 
            </div>

        </div>
    );
};

export default App;