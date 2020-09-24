import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";
import Accordion from "react-native-collapsible/Accordion";

const content = [
  {
    title: "Where is my tap?",
    content:
      'Once purchased you will recieve an email confirmation, and after a few minues, your tap will appear under the "My Taps" tab in the app. Please be patient, it might be a little slow as we\'re still in beta stage.',
  },
  {
    title: "How do I redeem a tap?",
    content:
      "Simply show your tap or voucher email to the cashier at the venue.",
  },
  {
    title: "How do I send a tap to a friend?",
    content:
      'Either click on "My Taps" and "Send to a friend" or simply forward your confirmation email to that contact.',
  },
  {
    title: "Who can I send a tap to?",
    content:
      "Almost anyone! As long as you have their email address or phone number. ",
  },
  {
    title: "How do I pay for a tap?",
    content: "Payment is handled by Stripe during checkout and is 100% secure.",
  },
  {
    title: "Do I receive a receipt?",
    content: "Yes, by email.",
  },
  {
    title: "How is a tap delivered?",
    content: "By email, and within the app.",
  },
  {
    title: "I had an issue redeeming a tap?",
    content:
      "Sorry to hear that. Please, contact us at support@tappy.co, or call +44 7817 207 576.",
  },
  {
    title: "Are there any charges or costs when collecting a tap at a venue?",
    content: "No.",
  },
  {
    title: "How long is a tap valid for?",
    content: "Taps are valid for three months from the date of purchase.",
  },
  {
    title: "When can I send a tap?",
    content: "Any time, any day!",
  },
  {
    title: "Can I cancel a tap?",
    content:
      "It is not possible to cancel a tap once it has been sent. If you require a refund, contact support@tappy.co.",
  },
];

export default class FAQ extends Component {
  state = {
    activeSections: [],
    collapsed: true,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={200}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text>{section.content}</Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const { activeSections } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Accordion
            activeSections={activeSections}
            sections={content}
            touchableComponent={TouchableOpacity}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e7f0dd",
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    backgroundColor: "#e7f0dd",
    padding: 10,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  headerText: {
    textAlign: "left",
    fontSize: 18,
    paddingLeft: 5,
    fontFamily: "NunitoSans-regular",
  },
  content: {
    padding: 20,
    fontFamily: "Eksell",
  },
  active: {
    backgroundColor: "#FFF",
    fontFamily: "Eksell",
  },
  inactive: {
    backgroundColor: "#e7f0dd",
    fontFamily: "Eksell",
  },
});
