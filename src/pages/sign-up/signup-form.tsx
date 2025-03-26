import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { _toFormData } from "@/lib/utils";
// import { OnboardFirmSchema } from "@/lib/validations/auth.schema";

export function SignUpForm() {
  // const router = useRouter();
  const form = useForm<z.infer<typeof OnboardFirmSchema>>({
    resolver: zodResolver(OnboardFirmSchema),
    defaultValues: {
      name: "",
      firstName: "",
      surName: "",
      phoneNumber: "",
      email: "",
      dialCode: "",
      firmSizeId: 0,
      // practiceAreas: [],
      // address: {
      //   state: "",
      //   cityId: "",
      // },
      // referralCode: "",
    },
  });

  form.watch();

  // const [acceptTermsError, setAcceptTermsError] = useState("");
  // const [acceptedTerms, setAcceptedTerms] = useState(false);

  // const [formState, formAction, isPending] = useActionState(onboardFirm, null);

  // const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // const [COUNTRIES, { data: countriesData, isLoading: isCountriesLoading }] =
  //   useLookup<Country>(["countries"], (c) => c.code);
  // const [PRACTICE_AREAS, { isLoading: isPracticeAreasLoading }] =
  //   useLookup<PracticeArea>(["practice-areas"], (d) => ({
  //     value: d.id,
  //     label: d.name,
  //   }));
  // const [STATES, { isLoading: isStatesLoading }] = useLookup<State>(
  //   [selectedCountry?.code || "", "states"],
  //   (d) => ({ value: d.id, label: d.name }),
  //   !!selectedCountry,
  // );
  // const [CITIES, { isLoading: isCitiesLoading }] = useLookup<City>(
  //   [form.watch("address.state"), "cities"],
  //   (d) => ({ value: String(d.id), label: d.name }),
  //   !!form.watch("address.state"),
  // );
  // const [FIRM_SIZES, { isLoading: isFirmSizesLoading }] = useLookup<FirmSize>(
  //   ["firm-sizes"],
  //   (d) => ({
  //     value: d.id,
  //     label: d.name,
  //   }),
  // );

  // const handleCountrySelect = (country: Country) => {
  //   const currentCountry = countriesData?.find(
  //     (c) => (c.code as unknown as Country) === country,
  //   );
  //   setSelectedCountry(currentCountry || null);
  //   form.setValue("dialCode", currentCountry?.dialCode || "");
  // };

  // const onSubmit = (values: z.infer<typeof OnboardFirmSchema>) => {
  //   const payload = {
  //     ...values,
  //     phoneNumber: values.phoneNumber.replace(values?.dialCode, ""),
  //   };
  //   const formData = _toFormData(payload);
  //   setAcceptTermsError("");

  //   if (!acceptedTerms) {
  //     setAcceptTermsError("Check the box to accept terms");
  //     return showErrorToast(
  //       "Please accept the terms and conditions to continue.",
  //     );
  //   }
  //   startTransition(async () => formAction(formData));
  // };

  // useEffect(() => {
  //   if (formState?.code === 2) {
  //     showErrorToast(formState.message || "Something went wrong", {
  //       closeButton: true,
  //     });
  //   }

  //   if (formState?.code === 1) {
  //     const email = encodeURIComponent(form.watch("email")); // TODO:  get email from formState.payload, not fornState.message
  //     const urlParams = new URLSearchParams(window.location.search);
  //     urlParams.set("email", email);
  //     router.push(`/onboarding/confirmation?${urlParams.toString()}`);
  //     showSuccessToast(formState.message, {
  //       description: "You will be redirected shortly",
  //       closeButton: true,
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formState]);

  return <div>Sign up form here</div>;

  // return (
  //   <Form {...form}>
  //     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
  //       <div className="space-y-5">
  //         <FormField
  //           control={form.control}
  //           name="name"
  //           render={({ field, fieldState }) => (
  //             <FormItem>
  //               <FormLabel required>Firm Name</FormLabel>
  //               <FormControl>
  //                 <Input
  //                   className={cn(fieldState.error && "border-destructive")}
  //                   {...field}
  //                   placeholder="Enter your firm name"
  //                 />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />

  //         <div className="grid gap-3.75 md:grid-cols-2 md:gap-x-7 md:gap-y-5">
  //           <FormField
  //             control={form.control}
  //             name="firstName"
  //             render={({ field, fieldState }) => (
  //               <FormItem>
  //                 <FormLabel required>First Name</FormLabel>
  //                 <FormControl>
  //                   <Input
  //                     className={cn(fieldState.error && "border-destructive")}
  //                     {...field}
  //                     placeholder="Enter your first name"
  //                   />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <FormField
  //             control={form.control}
  //             name="surName"
  //             render={({ field, fieldState }) => (
  //               <FormItem>
  //                 <FormLabel required>Surname</FormLabel>
  //                 <FormControl>
  //                   <Input
  //                     className={cn(fieldState.error && "border-destructive")}
  //                     {...field}
  //                     placeholder="Enter your surname"
  //                   />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <FormField
  //             control={form.control}
  //             name="phoneNumber"
  //             render={({ field, fieldState }) => (
  //               <FormItem>
  //                 <FormLabel required>Phone Number</FormLabel>
  //                 <FormControl>
  //                   <PhoneInput
  //                     key={String(isCountriesLoading)}
  //                     className={fieldState.error && "border-destructive"}
  //                     defaultCountry={COUNTRIES?.[0]}
  //                     loadingCountries={isCountriesLoading}
  //                     countries={COUNTRIES}
  //                     placeholder="080 5492 1074"
  //                     {...field}
  //                     onMount={(country) =>
  //                       handleCountrySelect(country as unknown as Country)
  //                     }
  //                     onCountryChange={(country) =>
  //                       handleCountrySelect(country as unknown as Country)
  //                     }
  //                   />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <FormField
  //             control={form.control}
  //             name="email"
  //             render={({ field, fieldState }) => (
  //               <FormItem>
  //                 <FormLabel required>Email</FormLabel>
  //                 <FormControl>
  //                   <Input
  //                     className={cn(fieldState.error && "border-destructive")}
  //                     {...field}
  //                     placeholder="Enter your email address"
  //                   />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />
  //         </div>

  //         <div className="flex w-full justify-stretch gap-x-7 gap-y-5 max-sm:flex-col sm:items-start">
  //           <FormField
  //             control={form.control}
  //             name="address.state"
  //             render={({ field, fieldState }) => (
  //               <FormItem className="flex-1 space-y-2">
  //                 <FormLabel className="capitalize" required>
  //                   {selectedCountry?.stateLabel || "State"}
  //                 </FormLabel>
  //                 <FormControl>
  //                   <Combobox
  //                     options={STATES}
  //                     className={fieldState.error && "border-destructive"}
  //                     placeholder="Select your state"
  //                     onSelect={(value) => {
  //                       if (value === field.value)
  //                         form.setValue("address.cityId", "");
  //                       form.setValue("address.state", value);
  //                     }}
  //                     align="start"
  //                     value={field.value}
  //                     loading={isStatesLoading}
  //                   />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           {form.watch("address.state") && (
  //             <FormField
  //               control={form.control}
  //               name="address.cityId"
  //               render={({ field, fieldState }) => (
  //                 <FormItem className="flex-1 space-y-2">
  //                   <FormLabel className="capitalize" required>
  //                     City
  //                   </FormLabel>
  //                   <FormControl>
  //                     <Combobox
  //                       options={CITIES}
  //                       placeholder="Select your city"
  //                       className={fieldState.error && "border-destructive"}
  //                       loading={isCitiesLoading}
  //                       notFoundMessage={
  //                         form.watch("address.state") ? (
  //                           <span className="px-2">
  //                             No cities found for this&nbsp;
  //                             <span className="lowercase">
  //                               {selectedCountry?.stateLabel || "state"}
  //                             </span>
  //                           </span>
  //                         ) : (
  //                           <span>
  //                             Please select&nbsp;
  //                             {selectedCountry?.stateLabel || "state"} to see
  //                             options.
  //                           </span>
  //                         )
  //                       }
  //                       onSelect={(value) =>
  //                         form.setValue("address.cityId", value)
  //                       }
  //                       value={field.value}
  //                     />
  //                   </FormControl>
  //                   <FormMessage />
  //                 </FormItem>
  //               )}
  //             />
  //           )}
  //         </div>

  //         <div className="grid gap-x-7 gap-y-5 sm:grid-cols-2">
  //           <FormField
  //             control={form.control}
  //             name="practiceAreas"
  //             render={({ field, fieldState }) => (
  //               <FormItem>
  //                 <FormLabel required>Practice Areas</FormLabel>
  //                 <FormControl>
  //                   <MultiSelect
  //                     {...field}
  //                     options={PRACTICE_AREAS}
  //                     placeholder="Select practice areas"
  //                     className={fieldState.error && "border-destructive"}
  //                     // creatable
  //                     loading={isPracticeAreasLoading}
  //                     emptyIndicator={
  //                       <span className="text-xs"> No options</span>
  //                     }
  //                   />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <FormField
  //             control={form.control}
  //             name="firmSizeId"
  //             render={({ field, fieldState }) => (
  //               <FormItem>
  //                 <FormLabel required>Firm Size</FormLabel>
  //                 <FormControl>
  //                   <Combobox
  //                     options={FIRM_SIZES}
  //                     placeholder="45 - 100"
  //                     className={fieldState.error && "border-destructive"}
  //                     onSelect={(value) =>
  //                       form.setValue("firmSizeId", Number(value))
  //                     }
  //                     loading={isFirmSizesLoading}
  //                     value={String(field.value)}
  //                   />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />
  //         </div>

  //         <FormField
  //           control={form.control}
  //           name="referralCode"
  //           render={({ field, fieldState }) => (
  //             <FormItem>
  //               <FormLabel>Referral</FormLabel>
  //               <FormControl>
  //                 <Input
  //                   className={cn(fieldState.error && "border-destructive")}
  //                   {...field}
  //                   placeholder="a1b2C3d4"
  //                 />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />
  //       </div>

  //       <div className="!mb-14 space-y-2">
  //         <div className="flex items-start space-x-2 sm:items-center">
  //           <Checkbox
  //             id="terms"
  //             onCheckedChange={(checked) => setAcceptedTerms(Boolean(checked))}
  //             className="border-input"
  //           />
  //           <label
  //             htmlFor="terms"
  //             className="text-foreground text-sm leading-snug font-medium text-pretty peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:leading-none"
  //           >
  //             I agree to Chronica&trade;{" "}
  //             <Link className="text-primary underline" href="#">
  //               Privacy Policy
  //             </Link>{" "}
  //             and{" "}
  //             <Link className="text-primary underline" href="#">
  //               Terms of Use
  //             </Link>
  //             .
  //           </label>
  //         </div>

  //         {acceptTermsError && (
  //           <p className="text-destructive text-xs font-medium">
  //             {acceptTermsError}
  //           </p>
  //         )}
  //       </div>

  //       <Button disabled={isPending} className="w-full" size="lg" type="submit">
  //         {isPending ? (
  //           <span className="flex animate-pulse items-center gap-2">
  //             <LoaderCircleIcon className="size-6 animate-spin" />
  //             Please wait
  //           </span>
  //         ) : (
  //           "Continue"
  //         )}
  //       </Button>
  //     </form>
  //   </Form>
  // );
}

const OnboardFirmSchema = z.object({
  name: z.string().nonempty("Firm name is required"),
  firstName: z.string().nonempty("First name is required"),
  surName: z.string().nonempty("Surname is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
  confirmPassword: z.string().nonempty("Confirm password is required"),
  phoneNumber: z.string().nonempty("Phone number is required"),
  dialCode: z.string().nonempty("Dial code is required"),
  firmSizeId: z.number().nonnegative("Firm size is required"),
});
