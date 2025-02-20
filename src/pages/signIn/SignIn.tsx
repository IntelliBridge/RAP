import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Fieldset,
  Form,
  FormGroup,
  Grid,
  GridContainer,
  Label,
  TextInput,
} from "@trussworks/react-uswds";

interface User {
  email: string;
  pw: string;
}

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.get<User[]>(`${import.meta.env.VITE_JSON_SERVER}/users`);
      const user = response.data.find(user => user.email === email && user.pw === password);

      if (user) {
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        const userString = JSON.stringify(user);
        const userObject = JSON.parse(userString);
        console.log(userObject);
        const userRole = userObject.role;
        const usermil = userObject.milid;
        localStorage.setItem('user-role', userRole);
        localStorage.setItem('user-milid', usermil);
        // Redirect to dashboard
        navigate('/dashboard');
        window.location.reload();
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <main className="sign-in-page">
        <div className="auth-content">
          <GridContainer containerSize="tablet">
            <Grid row>
              <Grid col={12}>
                <h1>Sign In</h1>
                <Form
                  onSubmit={handleSubmit}
                  large={true}
                  className="login-box"
                >
                  <Fieldset
                    data-testid="title"
                    legend="Sign in"
                    legendStyle="srOnly"
                  >
                    <span>Access your account.</span>

                    <FormGroup>
                      <Label htmlFor="email" error>
                        Email address
                      </Label>
                      <TextInput
                        id="email"
                        data-testid="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="password">Password</Label>
                      <TextInput
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        id="password"
                        required
                      />
                    </FormGroup>

                    {/* <button
                      data-testid="showPassword"
                      title="Show password"
                      type="button"
                      className="usa-show-password"
                      aria-controls="password passwordConfirm"
                      onClick={(): void =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? "Hide password" : "Show password"}
                    </button> */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button data-testid="submit" type="submit">
                      Sign in
                    </Button>

                    <p>
                      <a href="#/reset/password" title="Forgot password">
                        Forgot password?
                      </a>
                    </p>
                  </Fieldset>
                </Form>
              </Grid>
            </Grid>
          </GridContainer>
        </div>
      </main>
    </>
  );
};

export default SignIn;
