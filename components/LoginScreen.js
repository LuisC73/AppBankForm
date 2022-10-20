import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Picker,
} from "react-native";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import users from "../helpers/users";

function LoginScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");

  const onSubmit = (data) => {
    if (role === "admin") {
      if (data.user === "admin" && data.password === "Admin1234@") {
        navigation.navigate("Accounts", { user: data.user });
        reset();
      } else if (data.user != "admin") {
        setError("Wrong user");
      } else if (data.password != "Admin1234@") {
        setError("Wrong password");
      } else {
        setError("Incorrect data");
      }
    } else if (role === "user") {
      users.find((user) => {
        if (user.user === data.user && user.password === data.password) {
          navigation.navigate("Accounts", { user: data.user });
          reset();
        } else if (user.user != data.user) {
          setError("Wrong user");
        } else if (user.password != data.password) {
          setError("Wrong password");
        } else {
          setError("Incorrect data");
        }
      });
    } else {
      setError("This user is not registered");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 3000);
  }, [error]);

  return (
    <View style={styles.container}>
      <Image style={styles.images} source={require("../assets/bank.png")} />
      <Text style={{ color: "#47B5FF", fontWeight: 700, fontSize: 30 }}>
        Welcome Back!!
      </Text>
      <Text style={{ color: "#47B5FF90", fontSize: 12 }}>Sign to continue</Text>
      <View style={styles.content}>
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 20,
            minLength: 3,
            pattern: /^[A-Za-z]+$/i,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.inputs,
                {
                  borderColor:
                    errors.user?.type == "required" ||
                    errors.user?.type == "pattern" ||
                    errors.user?.type == "minLength" ||
                    errors.user?.type == "maxLength"
                      ? "red"
                      : "#C4DDFF",
                },
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Full Name ..."
            />
          )}
          name="user"
        />

        {errors.user?.type == "required" && (
          <Text style={{ color: "red" }}>The user is required</Text>
        )}
        {errors.user?.type == "pattern" && (
          <Text style={{ color: "red" }}>Only letters</Text>
        )}
        {errors.user?.type == "maxLength" && (
          <Text style={{ color: "red" }}>Max 20 characters</Text>
        )}
        {errors.user?.type == "minLength" && (
          <Text style={{ color: "red" }}>Min 3 characters</Text>
        )}

        <Picker
          selectedValue={role}
          style={styles.select}
          onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
        >
          <Picker.Item label="Admin" value="admin" />
          <Picker.Item label="User" value="user" />
        </Picker>

        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 15,
            minLength: 8,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.inputs,
                {
                  borderColor:
                    errors.password?.type == "required" ||
                    errors.password?.type == "pattern" ||
                    errors.password?.type == "minLength" ||
                    errors.password?.type == "maxLength"
                      ? "red"
                      : "#C4DDFF",
                },
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password ..."
            />
          )}
          name="password"
        />

        {errors.password?.type == "required" && (
          <Text style={{ color: "red" }}>The password is required</Text>
        )}
        {errors.password?.type == "pattern" && (
          <Text style={{ color: "red" }}>
            Only letters, numbers or special characters
          </Text>
        )}
        {errors.password?.type == "maxLength" && (
          <Text style={{ color: "red" }}>Max 15 characters</Text>
        )}
        {errors.password?.type == "minLength" && (
          <Text style={{ color: "red" }}>Min 8 characters</Text>
        )}

        <Text style={{ color: "red" }}>{error}</Text>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  images: {
    width: 170,
    height: 140,
  },
  inputs: {
    marginTop: 10,
    borderColor: "#C4DDFF",
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    color: "#C4DDFF",
  },
  button: {
    backgroundColor: "#47B5FF",
    width: "100%",
    borderRadius: 5,
    marginTop: 50,
    alignItems: "center",
    padding: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
  },
  select: {
    width: "100%",
    height: 35,
    borderColor: "#C4DDFF",
    color: "#C4DDFF",
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
});

export default LoginScreen;
