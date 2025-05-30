"use client";

import { useEffect, useState } from "react";

import { Button, Card, Flex, Heading } from "@radix-ui/themes";
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
 * 1. Debug <Table> not rendering data
 * 2. Update saveCustomerBaggage() to save the data to the API
 *    - endpoint: /api/baggage
 *    - method: POST
 * 3. Table should be populated with the data from the API
 * 4. Prevent Duplicate entries.
 *    - Before calling saveCustomerBaggage(),
 *      check if name AND flight number in form entry already exists in tableData
 *    - If it does, show an error message below the form. (erorr message should be hidden by default)
 * 5. The submit button should be disabled whilst submitting
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

export default function Page() {
  const [tableData, setTableData] = useState<MissingBags[]>([]);
  const [formData, setFormData] = useState<MissingBags>(defaultFormData);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    country: "",
    numberBags: "",
    flightNumber: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://67f61175913986b16fa68213.mockapi.io/api/baggage/users",
          { method: "GET" }
        );
        if (!response.ok) {
          console.error(
            `Error fetching data: ${response.status} ${response.statusText}`
          );
          throw new Error("Error occurred while fetching data");
        }
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error("Failed to fetch baggage data:", error);
      }
    };

    getData();
  }, []);

  const saveCustomerBaggage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://67f61175913986b16fa68213.mockapi.io/api/baggage/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        console.error(`Error with ${response.status} ${response.statusText}`);
        throw new Error("Error occurred while saving data");
      }
      const data = await response.json();
      setTableData((prev) => [...prev, data]);
    } catch (error) {
      console.error("Failed to save baggage data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDuplicateEntry = (entry: MissingBags, data: MissingBags[]) => {
    const normalize = (item: string) => item.trim().toLowerCase();
    return data.some(
      (item) =>
        normalize(item.name) === normalize(entry.name) &&
        normalize(item.flightNumber) === normalize(entry.flightNumber)
    );
  };

  const validateForm = () => {
    const error: typeof formErrors = {
      name: "",
      country: "",
      numberBags: "",
      flightNumber: "",
    };

    let isValid = true;

    if (!formData.name.trim()) {
      error.name = "Name is required";
      isValid = false;
    }

    if (!formData.country.trim()) {
      error.country = "country is required";
      isValid = false;
    }

    if (!formData.flightNumber.trim()) {
      error.flightNumber = "Flight number is required";
      isValid = false;
    }

    const bagCount = parseInt(formData.numberBags);

    if (!formData.numberBags || isNaN(bagCount) || bagCount < 0) {
      error.numberBags = "Enter a valid number greater than 0";
      isValid = false;
    }

    setFormErrors(error);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (isDuplicateEntry(formData, tableData)) {
      setIsErrorVisible(true);
    } else {
      setIsErrorVisible(false);
      await saveCustomerBaggage();
      setFormData(defaultFormData);
      setFormErrors({
        name: "",
        country: "",
        numberBags: "",
        flightNumber: "",
      });
    }
  };

  return (
    <>
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
              {formErrors.name && (
                <span style={{ color: "red" }}>{formErrors.name}</span>
              )}
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
              {formErrors.country && (
                <span style={{ color: "red" }}>{formErrors.country}</span>
              )}
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
              {formErrors.numberBags && (
                <span style={{ color: "red" }}>{formErrors.numberBags}</span>
              )}
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
              {formErrors.flightNumber && (
                <span style={{ color: "red" }}>{formErrors.flightNumber}</span>
              )}
            </>
            <Button type="submit" disabled={isLoading}>
              Add missing bag(s)
            </Button>
          </Flex>
        </Card>
      </form>
      {isErrorVisible && (
        <p>
          Error: <span style={{ color: "red" }}>Name already exists</span>
        </p>
      )}

      {/* Table */}
      <Heading mb="2" mt="4">
        Missing bags
      </Heading>
      <BaggageTable data={tableData} />
    </>
  );
}
