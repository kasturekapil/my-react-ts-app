"use client";

import "./App.css";
import { useEffect, useState } from "react";

import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import BaggageTable from "./components/Table";
import Field from "./components/Field";

/**
 * TIPS
 *
 * Talk through your ideas and solutions
 * Can use Google
 * Ask questions
 * No AI assistance (ChatGPT, Copilot, ...)
 *
 */

/**
 * TASKS
 *
 * 1. Fix the base url issue for the GET API request
 *    - Use the environment variable VITE_API_BASE_URL
 * 2. Debug <Table> not rendering data
 * 3. Update saveCustomerBaggage() to save the data to the API
 *    - endpoint: /user/baggage
 *    - method: POST
 * 4. Make sure not to submit empty form
 *    - All fields are required
 * 5. After successful submission, reset the form
 * 6. Table should be populated with data
 *     - latest data from the API, without needing to refresh the page
 *     - sort the table by flight number, before rendering
 *       (flight number should be sorted in ascending order)
 * 7. Prevent Duplicate entries.
 *    - Before calling saveCustomerBaggage(),
 *      check if name AND flight number in form entry already exists in tableData
 *    - If it does, show an error message below the form. (erorr message should be hidden by default)
 * 8. The submit button should be disabled whilst submitting
 * 9. Identify and Make sure to use performance optimizations like useCallback, useMemo, etc. where appropriate
 *
 */

export interface MissingBags {
  id?: number;
  name: string;
  country: string;
  numberBags: string;
  flightNumber: string;
}

const defaultFormData: MissingBags = {
  name: "",
  country: "",
  numberBags: "",
  flightNumber: "",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tableData, setTableData] = useState<MissingBags[]>([]);
  const [formData, setFormData] = useState<MissingBags>(defaultFormData);
  //Please add the upcoming state from here only

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/user/baggage", { method: "GET" });
        if (!response.ok) {
          console.error(
            `Error fetching data: ${response.status} ${response.statusText}`
          );
          throw new Error("Error occurred while fetching data");
        }
        //Please add the appropriate code to set table data
      } catch (error) {
        console.error("Failed to fetch baggage data:", error);
      }
    };

    getData();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const saveCustomerBaggage = async () => {
    //Please add the code to save the customer baggage here (POST request)
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (e: React.FormEvent) => {
    //Please add the code to handle form submission here
  };

  return (
    <>
      <h3>TCS Hands On - Missing Baggage Form</h3>
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card>
          <Heading mb="5" align="center">
            Add missing bag
          </Heading>

          <Flex direction="column" gap="3">
            <>
              <Field
                label="Your name"
                placeholder=""
                value={formData.name}
                setValue={(name: string) =>
                  setFormData((prev) => ({ ...prev, name }))
                }
              />
            </>
            <>
              <Field
                label="Your country"
                placeholder=""
                value={formData.country}
                setValue={(country: string) =>
                  setFormData((prev) => ({ ...prev, country }))
                }
              />
            </>
            <>
              <Field
                label="Number of bags"
                placeholder="0"
                value={formData.numberBags.toString()}
                setValue={(numberBags: string) =>
                  setFormData((prev) => ({ ...prev, numberBags }))
                }
              />
            </>

            <>
              <Field
                label="Flight number"
                placeholder="AIRNZ#"
                value={formData.flightNumber}
                setValue={(flightNumber: string) =>
                  setFormData((prev) => ({ ...prev, flightNumber }))
                }
              />
            </>
            <Button type="submit">Add missing bag(s)</Button>
          </Flex>
        </Card>
      </form>

      <p>
        Error:
        <Text as="label" size="2" style={{ color: "red" }}>
          Name already exists
        </Text>
      </p>

      {/* Table */}
      <Heading mb="2" mt="4">
        Missing bags
      </Heading>
      <BaggageTable data={[]} />
    </>
  );
}
