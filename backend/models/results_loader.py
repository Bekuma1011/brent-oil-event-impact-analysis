import pandas as pd
import json
import os

def load_prices():
    try:
        if os.path.exists("data/prices.csv"):
            df = pd.read_csv("data/prices.csv")
            df['Date'] = pd.to_datetime(df['Date'], format='%d-%b-%y')
            df['Log_Returns'] = df['Price'].pct_change()
            df['Volatility'] = df['Log_Returns'].rolling(window=20).std()
            return df[['Date', 'Price', 'Log_Returns', 'Volatility']].to_dict(orient="records")
        else:
            # Simulate with sample data
            data = {
                'Date': ['20-May-87', '21-May-87', '22-May-87', '25-May-87', '26-May-87',
                         '27-May-87', '28-May-87', '29-May-87', '1-Jun-87', '2-Jun-87', '3-Jun-87'],
                'Price': [18.63, 18.45, 18.55, 18.60, 18.63, 18.60, 18.60, 18.58, 18.65, 18.68, 18.75]
            }
            df = pd.DataFrame(data)
            df['Date'] = pd.to_datetime(df['Date'], format='%d-%b-%y')
            df['Log_Returns'] = df['Price'].pct_change()
            df['Volatility'] = df['Log_Returns'].rolling(window=20).std()
            return df[['Date', 'Price', 'Log_Returns', 'Volatility']].to_dict(orient="records")
    except Exception as e:
        raise Exception(f"Error loading prices: {str(e)}")

def load_change_points():
    try:
        if os.path.exists("data/change_points.json"):
            with open("data/change_points.json", "r") as file:
                data = json.load(file)
            return data
        else:
            # Simulate change point data
            return [{
                "Change Point Date": "2020-04-20",
                "Associated Event": "Brent prices fall below $20 due to COVID-19",
                "Event Date": "2020-04-20",
                "Mean Before ($)": 50.0,
                "Mean After ($)": 20.0,
                "Price Change (%)": -60.0
            }]
    except Exception as e:
        raise Exception(f"Error loading change points: {str(e)}")

def load_events():
    try:
        if os.path.exists("data/events.csv"):
            df = pd.read_csv("data/events.csv")
            df['Date'] = pd.to_datetime(df['Date'])
            return df.to_dict(orient="records")
        else:
            # Use Task 1 events
            data = {
                'Date': ['2012-02-01', '2016-09-28', '2018-05-08', '2018-11-01', '2020-03-06',
                         '2020-04-12', '2020-04-20', '2021-06-01', '2022-02-24', '2022-03-01',
                         '2022-10-05', '2022-12-01'],
                'Event': ['Libyan Civil War disrupts 1.5M bpd output', 'OPEC agrees to cut production by 1M bpd',
                          'U.S. withdraws from Iran nuclear deal', 'Iran sanctions reduce exports by 2.4M bpd',
                          'OPEC+ talks collapse, oil prices crash', 'OPEC+ cuts production by 10M bpd',
                          'Brent prices fall below $20 due to COVID-19', 'U.S. releases 30M barrels from SPR',
                          'Russia invades Ukraine, Brent spikes 30%', 'Western sanctions on Russian oil exports',
                          'OPEC+ cuts production by 2M bpd', 'EU imposes $60/bbl price cap on Russian oil'],
                'Category': ['Conflict', 'OPEC Policy', 'Sanction', 'Sanction', 'OPEC Policy', 'OPEC Policy',
                             'Economic Shock', 'Political Decision', 'Conflict', 'Sanction', 'OPEC Policy', 'Sanction']
            }
            df = pd.DataFrame(data)
            df['Date'] = pd.to_datetime(df['Date'])
            return df.to_dict(orient="records")
    except Exception as e:
        raise Exception(f"Error loading events: {str(e)}")