import {View, Text, TouchableOpacity, ActivityIndicator} from "react-native";

import styles from "./nearbyjobs.style";
import {COLORS} from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";

const NearbyJobs = () => {
  const {data, isLoading, error} = useFetch("search", {
    query: "React developer",
    num_pages: "1",
  });

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              key={job.job_id}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;
