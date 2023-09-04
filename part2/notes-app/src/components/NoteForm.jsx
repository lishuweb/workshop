const noteForm = ({ onSubmit, handleChange, value }) => {
    return (
      <form onSubmit = { onSubmit }>
        <input 
            value = { value } 
            onChange = { handleChange } 
        />
        <button>Submit</button>
      </form>
    )
  };

  export default noteForm;