# test_cleaning_functions.py

import pytest
import pandas as pd
from data_cleaning.cleaning_functions import clean_missing_values, remove_duplicates

# Sample data for testing
sample_data = {
    'Name': ['John', 'Jane', 'Mary', 'Steve'],
    'Age': [23, 29, None, 35],  # Age column with a missing value
}

# Create a DataFrame from the sample data
df = pd.DataFrame(sample_data)

# Test the clean_missing_values function
def test_clean_missing_values():
    cleaned_df = clean_missing_values(df)
    
    # Check that missing values are filled
    assert cleaned_df['Age'].isnull().sum() == 0  # Should have no missing values
    assert cleaned_df['Age'].mean() == pytest.approx(29.0, 0.1)  # The mean should be 29.0

# Test the remove_duplicates function
def test_remove_duplicates():
    # Data with duplicate rows
    duplicate_data = {
        'Name': ['John', 'Jane', 'Jane', 'Steve'],
        'Age': [23, 29, 29, 35],
    }
    
    df_with_duplicates = pd.DataFrame(duplicate_data)
    cleaned_df = remove_duplicates(df_with_duplicates)
    
    # Check that duplicates are removed
    assert len(cleaned_df) == 3  # Should only have 3 rows after removing duplicates
