import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View  className="flex-1 items-center justify-center px-4">
      <Text className="bg-priority-urgent">Edit src/app/index.tsx to edit this screen.</Text>
      <Button label="Great"  className="mt-10 w-full" />
      <Card className="mt-10">
        <Text>
        Hello, I am a card. I can be used to display content in a visually distinct container. You can customize my appearance using the className prop.
        </Text>
      </Card>
    </View>
  );
}