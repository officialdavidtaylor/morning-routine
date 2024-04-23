import { Link, Route, Switch } from 'wouter';
import { Routine } from './views/Routine';

export default function App() {
  return (
    <>
      {/* anything outside of the switch will render on all "routes" */}
      <Switch>
        <Route path="/routine">
          <Routine />
        </Route>

        <Route path="/">
          {/* TODO: navbar */}
          <p>home route / marketing site</p>
        </Route>

        {/* Default route in a switch is the 404 route */}
        <Route>
          <div className="flex flex-col justify-normal gap-8">
            <p>404: Looks like we're off the path!</p>
            <Link
              href="/routine"
              className="inline-block rounded-md bg-blue-600 text-white"
            >
              Back to my Routine
            </Link>
          </div>
        </Route>
      </Switch>
    </>
  );
}
