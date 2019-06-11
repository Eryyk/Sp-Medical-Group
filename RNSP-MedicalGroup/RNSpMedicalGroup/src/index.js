import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator
  } from "react-navigation";
  import Consultas from "./pages/ConsultaUsuario";
  import Login from "./pages/Login";
  
  const AuthStack = createStackNavigator({ Login });

  const ConsultaUsuario = createStackNavigator({ Consultas });

  //export default createAppContainer(MainNavigator);
  
  export default createAppContainer(
    createSwitchNavigator(
      {
        ConsultaUsuario,
        AuthStack
      },
      {
        initialRouteName: "AuthStack"
      }
    )
  );
  