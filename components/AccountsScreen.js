import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

function AccountsScreen({ route }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      holderAccount: "",
      date: "",
      balance: "",
    },
  });

  const getNroAccount = () => Math.floor(Math.random() * 100);

  const [nroAccount, setNroAccount] = useState(getNroAccount());
  const [complete, setComplete] = useState(false);
  const [data, setData] = useState({});

  const onSubmit = (data) => {
    setComplete(!complete);
    setData(data);
    reset();
  };

  const handleResult = (data) => {
    return (
      <View style={{ marginTop: 20 }}>
        <Text key={data.nroAccount} style={styles.text}>
          Nro Account: {nroAccount}
        </Text>
        <Text key={data.nroAccount} style={styles.text}>
          Identification: {data.id}
        </Text>
        <Text key={data.nroAccount} style={styles.text}>
          Holder Account: {data.holderAccount}
        </Text>
        <Text key={data.nroAccount} style={styles.text}>
          Date: {data.date}
        </Text>
        <Text key={data.nroAccount} style={styles.text}>
          Balance: {data.balance}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Image style={styles.images} source={require("../assets/card.png")} /> */}
      <View
        style={{
          display: !complete ? "flex" : "none",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text style={{ color: "#EE4878", fontWeight: 700, fontSize: 30 }}>
          Hello {route.params.user}!!
        </Text>
        <Text style={{ color: "#EE487890", fontSize: 12 }}>
          Complete the following form
        </Text>
        <View style={styles.content}>
          <TextInput defaultValue={nroAccount} style={styles.inputs} disabled />
          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 12,
              minLength: 3,
              pattern: /^[0-9]+$/i,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.inputs,
                  {
                    borderColor:
                      errors.id?.type == "required" ||
                      errors.id?.type == "pattern" ||
                      errors.id?.type == "minLength" ||
                      errors.id?.type == "maxLength"
                        ? "red"
                        : "#F999B7",
                  },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Identification ..."
              />
            )}
            name="id"
          />

          {errors.id?.type == "required" && (
            <Text style={{ color: "red" }}>The id is required</Text>
          )}
          {errors.id?.type == "pattern" && (
            <Text style={{ color: "red" }}>Only numbers</Text>
          )}
          {errors.id?.type == "maxLength" && (
            <Text style={{ color: "red" }}>Max 12 characters</Text>
          )}
          {errors.id?.type == "minLength" && (
            <Text style={{ color: "red" }}>Min 3 characters</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 20,
              minLength: 3,
              pattern: /^[A-Za-z\s]+$/g,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.inputs,
                  {
                    borderColor:
                      errors.holderAccount?.type == "required" ||
                      errors.holderAccount?.type == "pattern" ||
                      errors.holderAccount?.type == "minLength" ||
                      errors.holderAccount?.type == "maxLength"
                        ? "red"
                        : "#F999B7",
                  },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Holder Account ..."
              />
            )}
            name="holderAccount"
          />

          {errors.holderAccount?.type == "required" && (
            <Text style={{ color: "red" }}>The Holder Account is required</Text>
          )}
          {errors.holderAccount?.type == "pattern" && (
            <Text style={{ color: "red" }}>Only letters and/or spaces</Text>
          )}
          {errors.holderAccount?.type == "maxLength" && (
            <Text style={{ color: "red" }}>Max 20 characters</Text>
          )}
          {errors.holderAccount?.type == "minLength" && (
            <Text style={{ color: "red" }}>Min 3 characters</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/i,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.inputs,
                  {
                    borderColor:
                      errors.date?.type == "required" ||
                      errors.date?.type == "pattern"
                        ? "red"
                        : "#F999B7",
                  },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Date (dd/mm/yy)"
              />
            )}
            name="date"
          />

          {errors.date?.type == "required" && (
            <Text style={{ color: "red" }}>The date is required</Text>
          )}
          {errors.date?.type == "pattern" && (
            <Text style={{ color: "red" }}>Only date</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
              pattern:
                /^(1[0-9][0-9][0-9][0-9][0-9][0-9]|1[0-9][0-9][0-9][0-9][0-9][0-9][0-9]|100000000)$/,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.inputs,
                  {
                    borderColor:
                      errors.balance?.type == "required" ||
                      errors.balance?.type == "pattern" ||
                      errors.balance?.type == "minLength" ||
                      errors.balance?.type == "maxLength"
                        ? "red"
                        : "#F999B7",
                  },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Balance ..."
              />
            )}
            name="balance"
          />

          {errors.balance?.type == "required" && (
            <Text style={{ color: "red" }}>The balance is required</Text>
          )}
          {errors.balance?.type == "pattern" && (
            <Text style={{ color: "red" }}>
              Only numbers between 1 million and 100 million
            </Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Validate</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ display: complete ? "flex" : "none" }}>
        <Text style={{ color: "#EE4878", fontWeight: 700, fontSize: 30 }}>
          Good work!!
        </Text>
        {handleResult(data)}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setComplete(!complete)}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEE3EC",
    alignItems: "center",
    justifyContent: "center",
  },
  images: {
    width: 170,
    height: 140,
    marginBottom: 20,
  },
  inputs: {
    marginTop: 10,
    borderColor: "#F999B7",
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    color: "#EE487890",
  },
  button: {
    backgroundColor: "#EE4878",
    width: "100%",
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    padding: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
  },
  content: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
  },
});

export default AccountsScreen;
