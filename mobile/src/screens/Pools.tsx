import { Octicons } from "@expo/vector-icons";
import { Heading, Icon, VStack } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Pools() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" onShare={ ()=> console.log('shared')} />

      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button
          title="Buscar bolão por código"
          leftIcon={<Icon as={Octicons} name="search" color="white" size="md" />}
        />
      </VStack>


      <VStack mt={8} mx={5} alignItems="center">
        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através de{'\n'}
          seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
        />

        <Button
          title="Buscar bolão"
        />
      </VStack>

    </VStack>
  )
}