export const AuthForm = () => {
  return (
    <form>
      <div>
        <label>email:</label>
        <input type="email" />
      </div>
      <div>
        <label>password:</label>
        <input type="password" />
      </div>
      <button>Login</button>
    </form>
  );
};
